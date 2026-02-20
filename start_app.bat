@echo off
TITLE Smart Workout Server
CLS
ECHO =====================================================
ECHO        SMART WORKOUT - DIAGNOSTIC STARTUP
ECHO =====================================================
ECHO.

:: 1. Check for Node.js
ECHO [1/3] Checking for Node.js installation...
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Node.js is NOT found in your system path!
    ECHO.
    ECHO Please install Node.js from https://nodejs.org/
    ECHO After installing, restart your computer and try again.
    ECHO.
    PAUSE
    EXIT /B
)
ECHO [OK] Node.js found.
node -v
ECHO.

:: 2. Check for node_modules
ECHO [2/3] Checking dependencies...
IF NOT EXIST "node_modules" (
    ECHO [WARNING] 'node_modules' folder not found.
    ECHO Installing dependencies... (this may take a minute)
    call npm install
) ELSE (
    ECHO [OK] Dependencies look present.
)
ECHO.

:: 3. Start Server
ECHO [3/3] Starting Server...
ECHO.
ECHO -----------------------------------------------------
ECHO  PLEASE WAIT for "Server running..." message below.
ECHO  Then verify http://localhost:5000 in your browser.
ECHO -----------------------------------------------------
ECHO.

:: Use start command to open browser after 4 seconds (giving server time to boot)
timeout /t 4 >nul
start http://localhost:5000

:: Run the server
node server.js

ECHO.
ECHO Server has stopped or crashed.
PAUSE
