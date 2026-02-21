@echo off
echo.
echo ========================================
echo   EcoBazaar Backend Startup Script
echo ========================================
echo.

REM Set JAVA_HOME to JDK 17 (Eclipse Adoptium)
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot

REM Check if Maven is available, else use local Maven
where mvn >nul 2>nul
if %errorlevel%==0 (
    set MVN=mvn
    echo [INFO] Using system Maven
) else if exist "%USERPROFILE%\maven\apache-maven-3.9.6\bin\mvn.cmd" (
    set MVN=%USERPROFILE%\maven\apache-maven-3.9.6\bin\mvn.cmd
    echo [INFO] Using downloaded Maven at %MVN%
) else (
    echo [ERROR] Maven not found!
    echo [INFO]  Please install Maven from https://maven.apache.org/download.cgi
    echo [INFO]  Or run the setup-maven.ps1 script first.
    pause
    exit /b 1
)

echo [INFO] JAVA_HOME = %JAVA_HOME%
echo [INFO] Starting EcoBazaar Backend on http://localhost:8080
echo [INFO] H2 Console: http://localhost:8080/h2-console
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
%MVN% spring-boot:run
