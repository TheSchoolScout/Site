# SchoolScout (frontend)
**SchoolScout** is a Telegram Web App that helps students to prepare for exams by offering different tests and tracking their progress.
## Features
- Daily tasks
- User rating system
- Topic-based tests
- Random quiz modes
- History overview
## Stack
- Vue 3
## Setup
1. Clone the repository
```bash
git clone https://github.com/TheSchoolScout/Site.git
```
2. Navigate to the project directory and install dependencies
```bash
cd Site
npm ci
```
3. Run the dev server
```bash
npm run dev
```
4. Build for production
```bash
npm run build
```
5. Preview the local production build
```bash
npm run preview
```
Also, you can use Dockerfile to build the image and run the container
```bash
docker build -t schoolscout .
docker run -p 8080:80 schoolscout
```