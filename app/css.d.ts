declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Add custom CSS rules that the linter may not recognize
interface CSSRules {
  '@tailwind': string;
  '@layer': string;
  '@apply': string;
} 