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
    arts: _svg('<path d="M12 3a9 9 0 1 0 1 17.9c1-.1 1.4-1.3.8-2.1-.5-.7-.1-1.8.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z"/><circle cx="8" cy="12.5" r="1"/><circle cx="9.8" cy="8.4" r="1"/><circle cx="14.4" cy="8" r="1"/>')
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

/** A gold wax-seal SVG at any pixel size (className controls size in CSS). */
function sealSVG(className) {
  return `<svg class="${className}" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id="pfSeal" cx="0.4" cy="0.34" r="0.85">
        <stop offset="0" stop-color="#f6dd97"/><stop offset="0.55" stop-color="#c99a35"/><stop offset="1" stop-color="#8f6417"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="47" fill="#8f6417"/>
    <circle cx="50" cy="50" r="45" fill="url(#pfSeal)"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#7c5a12" stroke-width="3.5" stroke-dasharray="1.6 4.2" opacity="0.55"/>
    <circle cx="50" cy="50" r="36.5" fill="none" stroke="#fff3d0" stroke-width="1" opacity="0.5"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#6f5210" stroke-width="1" opacity="0.55"/>
    <path d="M50 22 L54.4 45.6 L78 50 L54.4 54.4 L50 78 L45.6 54.4 L22 50 L45.6 45.6 Z" fill="#5a3f0e"/>
    <circle cx="50" cy="50" r="4.4" fill="#fff3d0"/>
    <circle cx="50" cy="50" r="1.8" fill="#5a3f0e"/>
  </svg>`;
}
