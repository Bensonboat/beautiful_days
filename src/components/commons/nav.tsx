import style from "@/styles/commons/nav.module.sass";

const Nav = () => {
  return (
    <div className={style.nav}>
      <img src="/logo.png" alt="logo" className={style.img} />
      <a href="https://github.com/Bensonboat?tab=repositories" target="_blank">
        <img src="/github.png" alt="logo" className={style.img} />
      </a>
    </div>
  );
};

export default Nav;
