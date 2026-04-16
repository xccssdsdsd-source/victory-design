import { chromium } from 'playwright'
import { mkdirSync, readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'
const dir = join(__dirname, 'temporary screenshots')

mkdirSync(dir, { recursive: true })

const existing = readdirSync(dir).filter(f => /^screenshot-\d+\.png$/.test(f))
const n = existing.length + 1
const path = join(dir, `screenshot-${n}.png`)

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.addStyleTag({ content: '.fade-up,.fade-in{opacity:1!important;transform:none!important;transition:none!important}' })
await page.waitForTimeout(300)
await page.screenshot({ path, fullPage: true })
await browser.close()

console.log(`Saved: ${path}`)
