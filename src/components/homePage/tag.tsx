import style from "@/styles/homePage/tag.module.sass";

export interface ITag {
  label: string;
  selected: boolean;
}

interface ITagProps extends ITag {}

const Tag = (props: ITagProps) => {
  return (
    <div className={`${style.tag} ${props.selected && style.selected}`}>
      {props.label}
    </div>
  );
};

export default Tag;
