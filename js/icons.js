/* =============================================================================
   Compass 9, Icon system
   -----------------------------------------------------------------------------
   One visual language: 24px stroke icons that inherit `currentColor`, replacing
   every emoji. Plus a gold wax-seal, the signature mark used on the brand and
   the printable dossier.
   ========================================================================== */

const _svg = (paths) =>
  `<svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  /* one per field (keyed by major.key) */
  field: {
    business: _svg('<path d="M3 3v18h18"/><path d="M7 14.5l3.5-4 3 2.5L21 6"/><path d="M21 10V6h-4"/>'),
    medicine: _svg('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M12 8v8M8 12h8"/>'),
    engineering: _svg('<circle cx="12" cy="12" r="3.1"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9"/>'),
    cs: _svg('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M7 10.2l2.6 1.8L7 13.8M12.5 14h4"/>'),
    law: _svg('<path d="M12 3v18M7.5 21h9M4 8h16"/><path d="M7 8l-3 6a3 3 0 0 0 6 0L7 8ZM17 8l-3 6a3 3 0 0 0 6 0L17 8Z"/>'),
    social: _svg('<path d="M12 3a6 6 0 0 0-3.7 10.7c.4.3.7.8.7 1.3V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1.7 1.7 0 0 1 .7-1.3A6 6 0 0 0 12 3Z"/><path d="M9.5 21h5M10 9.5a2 2 0 0 1 4 0c0 1.2-2 1.8-2 3"/>'),
    arts: _svg('<path d="M12 3a9 9 0 1 0 1 17.9c1-.1 1.4-1.3.8-2.1-.5-.7-.1-1.8.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z"/><circle cx="8" cy="12.5" r="1"/><circle cx="9.8" cy="8.4" r="1"/><circle cx="14.4" cy="8" r="1"/>'),
    media: _svg('<path d="M3.5 10.5v3a1 1 0 0 0 1 1H7l4.5 3.2V7.3L7 10.5H4.5a1 1 0 0 0-1 0Z"/><path d="M15 8.6a5 5 0 0 1 0 6.8M17.6 6.4a8 8 0 0 1 0 11.2"/>')
  },

  /* UI icons */
  ui: {
    compass: _svg('<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2 5.2-2Z"/>'),
    target: _svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2"/>'),
    print: _svg('<path d="M6.5 9V3.5h11V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7.5 15h9v5.5h-9z"/><circle cx="17" cy="12.5" r=".6"/>'),
    bookmark: _svg('<path d="M6.5 3.5h11v17l-5.5-3.6L6.5 20.5z"/>'),
    check: _svg('<path d="M4.5 12.5l4.5 4.5 10.5-11"/>'),
    doc: _svg('<path d="M6.5 2.5h7l4 4v15h-11z"/><path d="M13.5 2.5v4h4"/><path d="M9 12h6M9 15.5h6"/>'),
    cap: _svg('<path d="M12 4 2.5 8.6 12 13l9.5-4.4L12 4Z"/><path d="M6.5 10.5v4.2c0 1 2.5 2.6 5.5 2.6s5.5-1.6 5.5-2.6v-4.2"/><path d="M21.5 8.6v5"/>'),
    salary: _svg('<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.9-2.6 2s1 1.7 2.6 2 2.6.9 2.6 2-1.1 2-2.6 2c-1.1 0-2.1-.5-2.6-1.4M12 6.4v1.4M12 16.2v1.4"/>'),
    map: _svg('<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z"/><path d="M9 4v14M15 6v14"/>'),
    star: _svg('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>'),
    quiz: _svg('<circle cx="12" cy="12" r="9"/><path d="M9.3 9.2a2.7 2.7 0 0 1 5.2 1c0 1.8-2.5 2-2.5 3.8"/><circle cx="12" cy="17" r=".7" fill="currentColor" stroke="none"/>'),
    home: _svg('<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/>')
  }
};

/** Compass 9 emblem: navy compass rose + gold, with an "IX" center. Scales to any size. */
function sealSVG(className) {
  return `<svg class="${className}" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="49" fill="#13294d"/>
    <circle cx="50" cy="50" r="46.5" fill="#f7f3e8"/>
    <circle cx="50" cy="50" r="46.5" fill="none" stroke="#c9a227" stroke-width="1.4"/>
    <circle cx="50" cy="50" r="42.5" fill="none" stroke="#13294d" stroke-width="3.4" stroke-dasharray="1 6.1" stroke-linecap="round"/>
    <path d="M71.2,28.8 L58,50 L71.2,71.2 L50,58 L28.8,71.2 L42,50 L28.8,28.8 L50,42 Z" fill="#c9a227"/>
    <path d="M50,11 L55.7,44.3 L89,50 L55.7,55.7 L50,89 L44.3,55.7 L11,50 L44.3,44.3 Z" fill="#13294d"/>
    <path transform="translate(50,26) scale(0.62)" d="M0,-9 C-2.4,-5 -6.5,-4.2 -6.5,0 C-6.5,3.4 -3,4.3 -2,1.8 C-2.2,5.2 -4.2,7.2 0,9.4 C4.2,7.2 2.2,5.2 2,1.8 C3,4.3 6.5,3.4 6.5,0 C6.5,-4.2 2.4,-5 0,-9 Z" fill="#d9b23a"/>
    <circle cx="50" cy="50" r="14.5" fill="#c9a227"/>
    <circle cx="50" cy="50" r="12" fill="#13294d"/>
    <circle cx="50" cy="50" r="12" fill="none" stroke="#e3c35a" stroke-width="0.8"/>
    <text x="50" y="50" fill="#e3c35a" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="13" text-anchor="middle" dominant-baseline="central" letter-spacing="0.5">IX</text>
  </svg>`;
}
