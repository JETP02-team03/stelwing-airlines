'use client';

import React, { useState, useEffect } from 'react';

export interface NotLoggedPageProps {
  
}

export default function NotLoggedPage({  }: NotLoggedPageProps) {
  return (
    <>
      <div>NotLogged Page</div>
      <div>請去登入，不然不准用，滾滾</div>
    </>
  );
}
