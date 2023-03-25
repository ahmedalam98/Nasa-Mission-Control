import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
          Created by :
          <a
            style={{
              color: "inherit",
              marginLeft: "5px",
            }}
            href="https://github.com/ahmedalam98"
            target="blank"
          >
            Ahmed Alam El-Deen
          </a>
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

export default Footer;
