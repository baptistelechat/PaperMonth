<h1 align="center">PaperMonth 🎨</h1>

<div align="center">
  <p><strong>Create beautiful, custom calendar wallpapers for your desktop.</strong></p>
</div>

<img src="./public/favicon.svg" height="150" align="right">

Welcome to **PaperMonth**, an interactive web application designed to generate personalized calendar wallpapers. Customize every aspect of your monthly view, from backgrounds and colors to special dates and holidays.

🔗 Go to https://papermonth.vercel.app/ to view the project.

## 📸 Project Screenshots

<div align="center">
  <img src="./public/screenshots/PaperMonth_2026_1 (0).png" alt="PaperMonth Main Interface" width="100%">
</div>
<div align="center">
  <img src="./public/screenshots/PaperMonth_2026_1 (1).png" alt="PaperMonth Main Interface" width="100%">
</div>
<div align="center">
  <img src="./public/screenshots/PaperMonth_2026_1 (3).png" alt="PaperMonth Main Interface" width="100%">
</div>

## 🎥 Demo Video
*Coming soon* ⌛

<!-- <div align="center">
  <video src="./public/PaperMonth.mp4" width="100%" controls></video>
</div> -->

## 🚀 Key Features

### 🎨 **Visual Customization**

- **Backgrounds**: Choose from gradients, or upload your own images.
- **Typography**: Customize fonts and text colors to match your style.

### 📅 **Smart Calendar**

- **Holidays**: Integrated support for public holidays and school vacations (Zone A, B, C).
- **World Days**: Automatically displays international days.

### 🛠️ **Widgets & Tools**

- **Tips & Quotes**: Monthly tips or inspirational quotes.
- **Live Preview**: Real-time preview of your wallpaper as you edit.
- **High-Quality Export**: Download your creation as a high-resolution image (PNG).

## 💻 Technical Stack

The project uses a modern and performant stack:

| Category      | Technologies                                                                                                                                                           |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**      | ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) |
| **Styles**    | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan) ![Shadcn/UI](https://img.shields.io/badge/Shadcn_UI-Latest-black)                                    |
| **Animation** | Framer Motion                                                                                                                                                          |
| **State**     | Zustand (Global state management)                                                                                                                                      |
| **Utils**     | html-to-image (Export), JSZip, FileSaver                                                                                                                               |

## 📦 Installation & Getting Started

Make sure you have **Node.js** and **PNPM** installed.

1. **Clone the project**

   ```bash
   git clone https://github.com/baptistelechat/PaperMonth.git
   cd PaperMonth
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be accessible at `http://localhost:5173` or your mobile device by scanning the qrCode in your terminal.

4. **Build for production**

   ```bash
   pnpm build
   ```

## 📂 Project Structure

Here is an overview of the source code organization:

```
src/
├── components/
│   ├── controls/      # Configuration panels (Background, Calendar, Typography)
│   ├── generator/     # Main generator UI (Preview, Actions)
│   ├── ui/            # Base components (Shadcn/UI)
│   └── widgets/       # Calendar widgets (Grid, Key Dates, Tips)
├── data/              # Static data (Tips, World Days)
├── hooks/             # Custom hooks (Export, Holidays, Store)
├── lib/               # Utilities and configurations
├── pages/             # Main pages (Generator)
├── store/             # Global state management (Zustand)
├── types/             # TypeScript definitions
└── utils/             # Helper functions (Dates, Formatting)
```

## 🛡️ Best Practices

This project follows defined code standards:

- **Linting**: `pnpm lint` to check code quality.
- **Architecture**: Clear separation between UI components, Logic (Hooks/Store), and Data.
- **Clean Code**: Explicit naming, component composition, and strict typing.

---

_Made with ❤️ by [Baptiste Lechat](https://github.com/baptistelechat)_
