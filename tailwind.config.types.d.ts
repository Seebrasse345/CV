interface TailwindDirectives {
  '@tailwind': string;
  '@layer': string;
  '@apply': string;
  '@variants': string;
  '@responsive': string;
  '@screen': string;
}

// This augments CSS properties in VS Code
declare module 'csstype' {
  interface Properties {
    // Add support for Tailwind's @apply rule
    '@apply'?: string;
    // Add support for Tailwind's screen directive
    '@screen'?: string;
    // Add support for Tailwind's variants directive
    '@variants'?: string;
  }
} 