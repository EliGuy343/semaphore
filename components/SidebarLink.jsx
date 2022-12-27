import { useRouter } from "next/router";

const SidebarLink = ({Icon, text, active, link}) => {
  const router = useRouter();
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-content
        xl:justify-start text-xl space-x-3 hoverAnimation
        ${active && 'font-bold'}`}
      onClick={()=> {
        if(link) {
          router.push(link);
        }
      }}
    >
      <Icon className="h-7"/>
      <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink;