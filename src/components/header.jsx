import '../App.css'


function Header(){
    return(
        <div>
    <header className="text-center ">

    <div className="image">
        <img src="./hero.png" alt="" width={400} height={400}   />
    </div>
    <h1 className="text-white text-4xl font-bold sm:text-4xl leading-snug ">
      Find <span className="text-purple-300">Movies</span> You'll Enjoy <br />
      Without the Hassle
    </h1>
  </header>
        </div>
    );
}

export default Header