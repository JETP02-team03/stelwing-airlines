'use client';
import { Plane } from 'lucide-react';
import { Button } from '../dutyfree-shop/components/ui/button';
import { Input } from '../dutyfree-shop/components/ui/input';
export default function Footer() {
  return (
    <footer className="bg-[var(--df-primary-dark)] text-[var(--df-text-light)]">
      {' '}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        {' '}
        {/* ==================== 上半區：四欄 ==================== */}{' '}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {' '}
          {/* Column 1 */}{' '}
          <div>
            {' '}
            <h3 className="font-semibold mb-4 text-lg">Get Started</h3>{' '}
            <ul className="space-y-2">
              {' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Private Jet{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Register{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Current Jet Deals{' '}
                </a>{' '}
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          {/* Column 2 */}{' '}
          <div>
            {' '}
            <h3 className="font-semibold mb-4 text-lg">Company</h3>{' '}
            <ul className="space-y-2">
              {' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  About Us{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Careers{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Contact{' '}
                </a>{' '}
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          {/* Column 3 */}{' '}
          <div>
            {' '}
            <h3 className="font-semibold mb-4 text-lg">Support</h3>{' '}
            <ul className="space-y-2">
              {' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Help Center{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  FAQs{' '}
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  {' '}
                  Terms & Conditions{' '}
                </a>{' '}
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          {/* Column 4 - Newsletter */}{' '}
          <div>
            {' '}
            <h3 className="font-semibold mb-4 text-lg">Newsletter</h3>{' '}
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              {' '}
              Fynest was founded in 1991 by a group of safety-focused
              professionals who created The Wyvern Standard for rigorously
              vetting air charter operators.{' '}
            </p>{' '}
            <div className="flex gap-2">
              {' '}
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-[var(--df-accent-gold)]"
              />{' '}
              <Button className="bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white whitespace-nowrap flex items-center gap-2">
                {' '}
                <Plane className="w-4 h-4" /> 加入我們{' '}
              </Button>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        {/* ==================== 中段：地點資訊 ===================={' '} */}
        {/* <div className="border-t border-white/10 pt-8">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {' '}
            <div>
              {' '}
              <h4 className="font-semibold mb-2">EUROPE</h4>{' '}
              <ul className="text-sm text-white/80 space-y-1">
                {' '}
                <li>45 Gloucester Road</li> <li>London DT1M 3BF</li>{' '}
                <li>+44 (0)20 3671 5709</li>{' '}
              </ul>{' '}
            </div>{' '}
            <div>
              {' '}
              <h4 className="font-semibold mb-2">ASIA</h4>{' '}
              <ul className="text-sm text-white/80 space-y-1">
                {' '}
                <li>3F, Taipei International Center</li>{' '}
                <li>Taipei City 106</li> <li>+886 (0)2 1234 5678</li>{' '}
              </ul>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '} */}
        {/* ==================== 下段：品牌資訊 ==================== */}{' '}
        <div className="mt-8 pt-8 border-t border-white/10">
          {' '}
          <div className="flex items-center gap-3 mb-4">
            {' '}
            <div className="relative">
              {' '}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {' '}
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="var(--df-accent-gold)"
                />{' '}
                <path
                  d="M2 17L12 22L22 17"
                  stroke="var(--df-accent-gold)"
                  strokeWidth="2"
                />{' '}
                <path
                  d="M2 12L12 17L22 12"
                  stroke="var(--df-accent-gold)"
                  strokeWidth="2"
                />{' '}
              </svg>{' '}
            </div>{' '}
            <span className="text-xl font-semibold tracking-wide">
              {' '}
              STELWING{' '}
            </span>{' '}
          </div>{' '}
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
            {' '}
            Fynest was founded in 1991 by a group of safety-focused
            professionals who created The Wyvern Standard for rigorously vetting
            all charter operators to ensure safety, reliability, and
            excellence.{' '}
          </p>{' '}
        </div>{' '}
        {/* ==================== 最底：著作權區 ==================== */}{' '}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          {' '}
          © {new Date().getFullYear()} Stelwing Airlines Duty Free — All rights
          reserved.{' '}
        </div>{' '}
      </div>{' '}
    </footer>
  );
}
