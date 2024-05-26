import React from "react";

export default function Footer() {
  return (
    <>
      <main className="footer p-10  text-white flex justify-center items-center w-full mt-20">
        <div className="flex w-full flex-col max-w-7xl">
          <footer className="footer p-10 bg-base-200 text-base-content">
            <nav>
              <h6 className="footer-title">Countries</h6>
              <a className="link link-hover">Regions</a>
              <a className="link link-hover">Cities</a>
              <a className="link link-hover">Districts</a>
              <a className="link link-hover">Airports</a>
            </nav>
            <nav>
              <h6 className="footer-title">Homes</h6>
              <a className="link link-hover">Apartments</a>
              <a className="link link-hover">Resorts</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">B&Bs</a>
            </nav>
            <nav>
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
              <a className="link link-hover">Contact</a>
            </nav>
            <form>
              <h6 className="footer-title">Newsletter</h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="label-text">Enter your email address</span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item"
                  />
                  <button className="btn bg-blue-800 text-white hover:bg-blue-700 join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </footer>
        </div>
      </main>
    </>
  );
}
