import { GitHub, LinkedIn } from "@material-ui/icons";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<div>All Rights Reserved &copy; - Morad Abu Alkeaan {(new Date()).getFullYear()}</div>
            <div>GitHub <GitHub />: <a target="_blank" href="https://www.github.com/M0R4d/">M0R4D</a></div>
            <div>LinkedIn <LinkedIn />: <a target="_blank" href="https://www.linkedin.com/in/morad-abu-alkeaan/">Morad Abu Alkeaan</a></div>
        </div>
    );
}

export default Footer;
