// public/ の画像から、静的な書き出し用の AVIF の幅違いを public/_img/ に作る（2026-11-24）。
// 幅は image-widths.json（image-loader.js と共通）。元より広くは広げない。作り済みで元より新しい物は飛ばす。
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const pub = path.join(root, 'public')
const dest = path.join(pub, '_img')
const WIDTHS = JSON.parse(
  fs.readFileSync(path.join(root, 'image-widths.json'), 'utf8'),
)
const EXT = /\.(jpe?g|png|webp|avif)$/i

function walk(dir) {
  const files = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (p !== dest) files.push(...walk(p))
    } else if (EXT.test(e.name)) {
      files.push(p)
    }
  }
  return files
}

let made = 0
let kept = 0
for (const file of walk(pub)) {
  const rel = path.relative(pub, file).replace(EXT, '')
  const srcTime = fs.statSync(file).mtimeMs
  const { width } = await sharp(file).metadata()
  for (const w of WIDTHS) {
    const target = path.join(dest, `${rel}-${w}.avif`)
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= srcTime) {
      kept++
      continue
    }
    fs.mkdirSync(path.dirname(target), { recursive: true })
    await sharp(file)
      .resize({ width: Math.min(w, width) })
      .avif({ quality: 55, effort: 4 })
      .toFile(target)
    made++
  }
}
console.log(`gen-images: made ${made}, kept ${kept}`)
