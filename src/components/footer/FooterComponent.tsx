
"use client";

import { Footer } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container className="mt-10">
      <div className="w-full text-center">
        <div className="container justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="https://images.vexels.com/media/users/3/318410/isolated/preview/eba4aa0cd5cf829edb21df16da01a6a4-cute-capybara-playing-with-a-butterfly.png"
            alt="Hemechi Logo"
            name="Hemechi"
          />
          <Footer.LinkGroup>
            <Footer.Link href="/about-us">About</Footer.Link>
            <Footer.Link href="/policy">Privacy Policy</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Hemechi™" year={2024} />
      </div>
    </Footer>
  );
}
