import React from 'react';

interface DarpanLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  color?: string; // override primary navy color if needed
  style?: React.CSSProperties;
}

export default function DarpanLogo({
  className = '',
  variant = 'full',
  color = '#1b365d',
  style,
}: DarpanLogoProps) {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 500 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-label="Darpan Construction Logo"
      >
        {/* Roof Chimney */}
        <rect x="366" y="138" width="22" height="30" fill={color} />

        {/* Double Layer Roof Gable */}
        <path
          d="M250 82L45 208L56 224L250 102L444 224L455 208L250 82Z"
          fill={color}
        />
        <path
          d="M250 114L85 220L93 232L250 130L407 232L415 220L250 114Z"
          fill={color}
        />

        {/* Attic 4-Pane Window */}
        <g fill="#7A838E">
          <rect x="228" y="148" width="18" height="17" rx="1" />
          <rect x="254" y="148" width="18" height="17" rx="1" />
          <rect x="228" y="171" width="18" height="17" rx="1" />
          <rect x="254" y="171" width="18" height="17" rx="1" />
        </g>

        {/* Word DARPAN with Arched Window 'A's */}
        {/* Letter D */}
        <path
          d="M80 206H105C124 206 135 220 135 262C135 304 124 318 105 318H80V206ZM95 221V303H104C115 303 120 292 120 262C120 232 115 221 104 221H95Z"
          fill={color}
        />

        {/* Letter A (First) - Arched Window Style */}
        <g>
          {/* Arch frame */}
          <path
            d="M142 318V250C142 220 157 205 178 205C199 205 214 220 214 250V318H199V252C199 230 191 220 178 220C165 220 157 230 157 252V318H142Z"
            fill={color}
          />
          {/* Inner 6 Window Panes */}
          <g fill={color}>
            {/* Top Left rounded pane */}
            <path d="M162 238C162 230 166 226 174 226V245H162V238Z" />
            {/* Top Right rounded pane */}
            <path d="M182 226C190 226 194 230 194 238V245H182V226Z" />
            {/* Mid Left pane */}
            <rect x="162" y="249" width="12" height="20" />
            {/* Mid Right pane */}
            <rect x="182" y="249" width="12" height="20" />
            {/* Bottom Left pane */}
            <rect x="162" y="273" width="12" height="20" />
            {/* Bottom Right pane */}
            <rect x="182" y="273" width="12" height="20" />
            {/* Extra lower base panes */}
            <rect x="162" y="297" width="12" height="17" />
            <rect x="182" y="297" width="12" height="17" />
          </g>
        </g>

        {/* Letter R */}
        <path
          d="M222 206H251C266 206 274 216 274 235C274 249 267 258 255 261L276 318H259L240 264H236V318H222V206ZM236 221V251H249C256 251 260 246 260 236C260 226 256 221 249 221H236Z"
          fill={color}
        />

        {/* Letter P */}
        <path
          d="M282 206H311C326 206 335 216 335 237C335 258 326 268 311 268H296V318H282V206ZM296 221V253H309C316 253 321 248 321 237C321 226 316 221 309 221H296Z"
          fill={color}
        />

        {/* Letter A (Second) - Arched Window Style */}
        <g>
          {/* Arch frame */}
          <path
            d="M343 318V250C343 220 358 205 379 205C400 205 415 220 415 250V318H400V252C400 230 392 220 379 220C366 220 358 230 358 252V318H343Z"
            fill={color}
          />
          {/* Inner 6 Window Panes */}
          <g fill={color}>
            {/* Top Left rounded pane */}
            <path d="M363 238C363 230 367 226 375 226V245H363V238Z" />
            {/* Top Right rounded pane */}
            <path d="M383 226C391 226 395 230 395 238V245H383V226Z" />
            {/* Mid Left pane */}
            <rect x="363" y="249" width="12" height="20" />
            {/* Mid Right pane */}
            <rect x="383" y="249" width="12" height="20" />
            {/* Bottom Left pane */}
            <rect x="363" y="273" width="12" height="20" />
            {/* Bottom Right pane */}
            <rect x="383" y="273" width="12" height="20" />
            {/* Extra lower base panes */}
            <rect x="363" y="297" width="12" height="17" />
            <rect x="383" y="297" width="12" height="17" />
          </g>
        </g>

        {/* Letter N */}
        <path
          d="M423 206H436L463 286V206H477V318H464L437 238V318H423V206Z"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`darpan-logo ${className}`}
      style={style}
      aria-label="Darpan Construction - Mirror Image of Your Dream Home"
    >
      {/* Chimney */}
      <rect x="366" y="138" width="22" height="30" fill={color} />

      {/* Double Gable Roof Line */}
      <path
        d="M250 82L45 208L56 224L250 102L444 224L455 208L250 82Z"
        fill={color}
      />
      <path
        d="M250 114L85 220L93 232L250 130L407 232L415 220L250 114Z"
        fill={color}
      />

      {/* 4-Pane Attic Window */}
      <g fill="#7A838E">
        <rect x="228" y="148" width="18" height="17" rx="1" />
        <rect x="254" y="148" width="18" height="17" rx="1" />
        <rect x="228" y="171" width="18" height="17" rx="1" />
        <rect x="254" y="171" width="18" height="17" rx="1" />
      </g>

      {/* --- DARPAN LETTERS --- */}
      {/* Letter D */}
      <path
        d="M80 204H105C124 204 135 218 135 260C135 302 124 316 105 316H80V204ZM95 219V301H104C115 301 120 290 120 260C120 230 115 219 104 219H95Z"
        fill={color}
      />

      {/* Letter A (First) with Arched Window */}
      <g>
        <path
          d="M142 316V248C142 218 157 203 178 203C199 203 214 218 214 248V316H199V250C199 228 191 218 178 218C165 218 157 228 157 250V316H142Z"
          fill={color}
        />
        {/* Window Panes inside A */}
        <g fill={color}>
          {/* Row 1 - Arched */}
          <path d="M162 238C162 230 166 226 174 226V245H162V238Z" />
          <path d="M182 226C190 226 194 230 194 238V245H182V226Z" />
          {/* Row 2 */}
          <rect x="162" y="249" width="12" height="19" />
          <rect x="182" y="249" width="12" height="19" />
          {/* Row 3 */}
          <rect x="162" y="272" width="12" height="19" />
          <rect x="182" y="272" width="12" height="19" />
          {/* Row 4 */}
          <rect x="162" y="295" width="12" height="17" />
          <rect x="182" y="295" width="12" height="17" />
        </g>
      </g>

      {/* Letter R */}
      <path
        d="M222 204H251C266 204 274 214 274 233C274 247 267 256 255 259L276 316H259L240 262H236V316H222V204ZM236 219V249H249C256 249 260 244 260 234C260 224 256 219 249 219H236Z"
        fill={color}
      />

      {/* Letter P */}
      <path
        d="M282 204H311C326 204 335 214 335 235C335 256 326 266 311 266H296V316H282V204ZM296 219V251H309C316 251 321 246 321 235C321 224 316 219 309 219H296Z"
        fill={color}
      />

      {/* Letter A (Second) with Arched Window */}
      <g>
        <path
          d="M343 316V248C343 218 358 203 379 203C400 203 415 218 415 248V316H400V250C400 228 392 218 379 218C366 218 358 228 358 250V316H343Z"
          fill={color}
        />
        {/* Window Panes inside A */}
        <g fill={color}>
          {/* Row 1 - Arched */}
          <path d="M363 238C363 230 367 226 375 226V245H363V238Z" />
          <path d="M383 226C391 226 395 230 395 238V245H383V226Z" />
          {/* Row 2 */}
          <rect x="363" y="249" width="12" height="19" />
          <rect x="383" y="249" width="12" height="19" />
          {/* Row 3 */}
          <rect x="363" y="272" width="12" height="19" />
          <rect x="383" y="272" width="12" height="19" />
          {/* Row 4 */}
          <rect x="363" y="295" width="12" height="17" />
          <rect x="383" y="295" width="12" height="17" />
        </g>
      </g>

      {/* Letter N */}
      <path
        d="M423 204H436L463 284V204H477V316H464L437 236V316H423V204Z"
        fill={color}
      />

      {/* Top Divider Line */}
      <line x1="78" y1="326" x2="479" y2="326" stroke="#7A838E" strokeWidth="2.5" />

      {/* CONSTRUCTION Text */}
      <text
        x="278"
        y="346"
        fill="#7A838E"
        fontSize="17.5"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
        letterSpacing="0.48em"
      >
        CONSTRUCTION
      </text>

      {/* Bottom Divider Line */}
      <line x1="78" y1="357" x2="479" y2="357" stroke="#7A838E" strokeWidth="2.5" />

      {/* Tagline Ribbon / Plaque */}
      <rect x="65" y="367" width="426" height="34" fill={color} />

      {/* Tagline Text */}
      <text
        x="278"
        y="389.5"
        fill="#FFFFFF"
        fontSize="12.5"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
        letterSpacing="0.12em"
      >
        MIRROR IMAGE OF YOUR DREAM HOME
      </text>
    </svg>
  );
}
