import Image from "next/image"
import rocket from "@/../public/rocket.svg"

export default function Header() {

  return (
    <header id="app-header"
      className=" h-[20vh] flex flex-col w-full items-center justify-center bg-dark-primary">
      <div id="app-name"
        className="flex items-center">
        <div id="rocket-icon-container"
          className="h-12 w-12">
          <Image src={rocket} alt="rocket-icon"></Image>
        </div>
        <p className={`text-2xl font-extrabold text-theme-primary-light`}>
          Todo
        </p>
        <p className={`text-2xl font-extrabold ml-1 text-theme-secondary`}>
          App
        </p>
      </div>
    </header>
  )
}