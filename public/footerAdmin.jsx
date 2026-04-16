import React from "react";


function FooterAdmin(){
    return(
        <div className="bg-light">
            

            <div class="container">
            <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="/administrador/home" class="nav-link px-2 text-body-secondary">Home administrador</a></li>
                <li class="nav-item"><a href="/" class="nav-link px-2 text-body-secondary">Volver a Global</a></li>

                </ul>
                <p class="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
            </footer>
            </div>



        </div>
    );
}


export default FooterAdmin;