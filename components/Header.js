import Image from "next/image";

export default function Header(){
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom justify-content-center" >
      <div className="container-fluid">
        <a className="navbar-brand fs-3 px-5" href="#">
          <Image src="/STALogo.png" alt="" width="50" height="50" className="d-inline-block align-text-center"/>
            &nbsp;
            Church Management Center
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          

          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item px-3">
    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Check In/Out</a>
  </li>
</ul>

        </div>
  </div>
</nav>
    </div>
  );
}