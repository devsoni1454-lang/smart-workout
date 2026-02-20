@echo off
setlocal
echo ==========================================
echo      Smart Workout Deployment Setup
echo ==========================================

:: 1. Check for Git
echo [1/4] Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Attempting to install via Winget...
    winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
    
    if %errorlevel% neq 0 (
        echo [ERROR] Automatic installation failed. 
        echo Please leave this script open, download Git from https://git-scm.com/downloads manually, install it, and then re-run this script.
        pause
        exit /b 1
    )
    
    echo [SUCCESS] Git installed.
    echo [IMPORTANT] Windows needs to refresh your path.
    echo Please CLOSE this terminal window completely, open a NEW one, and run this script again.
    pause
    exit /b 0
)

:: 2. Configure Git (local only, if needed)
echo [2/4] Configuring local Git user (safeguard)...
git config user.name "Smart Workout User" >nul 2>&1
git config user.email "user@example.com" >nul 2>&1

:: 3. Initialize Repo
echo [3/4] Initializing Git repository...
if exist .git (
    echo     Repository already exists. Skipping init.
) else (
    git init
    git branch -M main
    echo     Initialized new repository.
)

:: 4. Stage and Commit
echo [4/4] Staging and committing files...
git add .
git commit -m "Initial commit for deployment" >nul 2>&1
if %errorlevel% equ 0 (
    echo     Code committed successfully.
) else (
    echo     Nothing to commit or commit failed (maybe already committed?).
)

echo.
echo ==========================================
echo        SETUP COMPLETE (LOCALLY)
echo ==========================================
echo.
echo I cannot create a GitHub repository for you automatically because I don't have your password.
echo.
echo PLEASE DO THIS MANUALLY:
echo 1. Go to https://github.com/new and create a repo named 'smart-workout'.
echo 2. Copy the HTTPS URL provided (ending in .git).
echo 3. Paste and run these two commands in this terminal:
echo.
echo    git remote add origin <YOUR_URL>
echo    git push -u origin main
echo.
pause
