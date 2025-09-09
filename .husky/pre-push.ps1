Write-Host "🚀 Run build ... "
bun run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Build failed! Please fix the errors and warnings first."
  exit 1
}
Write-Host "✅ Pre-push hook completed successfully."