/**
 * Cloudinary 일괄 Rename 스크립트
 *
 * 사용법:
 * 1. npm install cloudinary
 * 2. 아래 설정값 입력
 * 3. node cloudinary_rename.js
 */

const cloudinary = require('cloudinary').v2

// ✅ 여기에 본인 Cloudinary 정보 입력 (Console > Settings > API Keys)
cloudinary.config({
  cloud_name: 'dqjqt0ld5', // 본인 cloud name
  api_key: '326271237562352', // API Key
  api_secret: 'hdiQhbZMj4q0vTuTi2QiUwC6JyU', // API Secret
})

// ✅ 옵션 설정
const OPTIONS = {
  folder: '', // 특정 폴더만 처리하려면 입력 (예: "wedding"), 전체는 ""
  dryRun: false, // true: 실제 변경 없이 미리보기만 / false: 실제 변경
  maxResults: 500, // 한 번에 처리할 최대 이미지 수
}

/**
 * Public ID에서 suffix(_xxxxx) 제거
 * 예: "wedding_10_a6w0fc" → "wedding_10"
 *     "folder/wedding_10_a6w0fc" → "folder/wedding_10"
 */
function stripSuffix(publicId) {
  // 마지막 세그먼트에서 _영숫자6자리 패턴 제거
  return publicId.replace(/_[a-z0-9]{6}$/, '')
}

async function getAllAssets() {
  let assets = []
  let nextCursor = null

  console.log('📂 이미지 목록 불러오는 중...\n')

  do {
    const params = {
      type: 'upload',
      max_results: 100,
      ...(nextCursor && { next_cursor: nextCursor }),
      ...(OPTIONS.folder && { prefix: OPTIONS.folder }),
    }

    const result = await cloudinary.api.resources(params)
    assets = assets.concat(result.resources)
    nextCursor = result.next_cursor

    process.stdout.write(`  불러온 이미지: ${assets.length}개\r`)
  } while (nextCursor && assets.length < OPTIONS.maxResults)

  console.log(`\n✅ 총 ${assets.length}개 이미지 발견\n`)
  return assets
}

async function renameAssets(assets) {
  const toRename = []

  // suffix가 있는 이미지만 필터링
  for (const asset of assets) {
    const originalId = asset.public_id
    const newId = stripSuffix(originalId)

    if (originalId !== newId) {
      toRename.push({ from: originalId, to: newId })
    }
  }

  if (toRename.length === 0) {
    console.log('✅ 변경할 이미지가 없습니다.')
    return
  }

  console.log(`🔄 변경 대상: ${toRename.length}개\n`)
  console.log('─'.repeat(60))

  if (OPTIONS.dryRun) {
    console.log('📋 [DRY RUN] 실제 변경 없이 미리보기:\n')
    toRename.forEach(({ from, to }) => {
      console.log(`  ${from}`)
      console.log(`  → ${to}\n`)
    })
    console.log('─'.repeat(60))
    console.log(
      '\n⚠️  실제로 변경하려면 OPTIONS.dryRun = false 로 설정하세요.\n',
    )
    return
  }

  // 실제 rename 실행
  console.log('🚀 rename 시작...\n')
  let success = 0
  let failed = 0
  const toDelete = []

  for (const { from, to } of toRename) {
    try {
      await cloudinary.uploader.rename(from, to, { overwrite: false })
      console.log(`✅ ${from} → ${to}`)
      success++
    } catch (err) {
      // 이미 같은 이름이 존재하는 경우 → 중복본이므로 삭제 대상에 추가
      if (err.message?.includes('already exists')) {
        console.log(`🗑️  삭제 예정 (중복): ${from}`)
        toDelete.push(from)
      } else {
        console.log(`❌ 실패: ${from} → ${err.message}`)
        failed++
      }
    }

    await new Promise((r) => setTimeout(r, 300))
  }

  // 중복본 삭제
  if (toDelete.length > 0) {
    console.log(`\n🗑️  중복 이미지 ${toDelete.length}개 삭제 중...\n`)
    for (const publicId of toDelete) {
      try {
        await cloudinary.uploader.destroy(publicId)
        console.log(`  ✅ 삭제 완료: ${publicId}`)
      } catch (err) {
        console.log(`  ❌ 삭제 실패: ${publicId} → ${err.message}`)
      }
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  console.log('\n' + '─'.repeat(60))
  console.log(
    `\n🎉 완료! rename 성공: ${success}개 / 중복 삭제: ${toDelete.length}개 / 실패: ${failed}개\n`,
  )
}

async function main() {
  try {
    const assets = await getAllAssets()
    await renameAssets(assets)
  } catch (err) {
    console.error('❌ 오류 발생:', err.message)
    if (err.message?.includes('401')) {
      console.error('→ API Key / Secret을 확인해주세요.')
    }
  }
}

main()
