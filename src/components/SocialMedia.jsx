import React from "react";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/wajid-ali-altamash-14a77a16a/">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/Wajid90273/Netflix-clone">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://twitter.com/Wajid90273">
        <BsTwitter />
      </a>
    </div>
  </div>
);

export default SocialMedia;
