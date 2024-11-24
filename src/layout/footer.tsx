import Styles from "./layout.module.css"

const FooterBar: React.FC = () => {
    return (
        <div className={Styles.footer}>
            <p>© 2024 Countries Dashboard. All Rights Reserved.</p>
        </div>
    );
};

export default FooterBar;
