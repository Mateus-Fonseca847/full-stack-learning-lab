document.addEventListener("DOMContentLoaded", function(){
  const formularioLogin = document.getElementById("formularioLogin");
  const emailInputLogin = document.getElementById("emailInputLogin");
  const senhaInputLogin = document.getElementById("senhaInputLogin")
  const emailErrorLogin = document.getElementById("emailErrorLogin");
  const senhaErrorLogin = document.getElementById("senhaErrorLogin");
  const loginMessage = document.getElementById("loginMessage")

  const botaoCadastro = document.getElementById("signUp");
  const secaoCadastro = document.getElementById("secaoCadastro");
  const formularioCadastro = document.getElementById("formularioCadastro");
  const nomeInputCadastro = document.getElementById("nomeInputCadastro");
  const emailInputCadastro = document.getElementById("emailInputCadastro");
  const senhaInputCadastro = document.getElementById("senhaInputCadastro");
  const nomeErrorCadastro = document.getElementById("nomeErrorCadastro");
  const emailErrorCadastro = document.getElementById("emailErrorCadastro");
  const senhaErrorCadastro = document.getElementById("senhaErrorCadastro");
  const senhaErrorInválida = document.getElementById("senhaErrorInválida");

  const botaoLogin = document.getElementById("login");
  const secaoLogin = document.getElementById("secaoLogin");

  botaoCadastro.addEventListener("click", function() {
    secaoCadastro.classList.add("right-panel-active");
  })

  botaoLogin.addEventListener("click", function() {
    secaoCadastro.classList.remove("right-panel-active");
  })

  formularioCadastro.addEventListener("submit", function(event){
    event.preventDefault();
    //verifica formulário de cadastro
      if(!nomeInputCadastro.value){
        nomeErrorCadastro.style.display = "block"
        
      } else{
        nomeErrorCadastro.style.display = "none"
      }
    
      if(!emailInputCadastro.value){
        emailErrorCadastro.style.display = "block"
        
      } else{
        emailErrorCadastro.style.display = "none"
      }
      
      if(!senhaInputCadastro.value){
        senhaErrorCadastro.style.display = "block"
        
      } else{
        senhaErrorCadastro.style.display = "none"
      };


      const possuiSimbolo = /[^A-Za-z0-9\s]/.test(senhaInputCadastro.value);

      if(senhaInputCadastro.value.length < 8){
        senhaErrorInválida.style.display = "block"
      } else if (!possuiSimbolo){
        senhaErrorInválida.style.display = "block"
      } else{
        senhaErrorInválida.style.display = "none"
      };
        
      const dadosCadastro = {
        nome: nomeInputCadastro.value,
        email: emailInputCadastro.value,
        senha: senhaInputCadastro.value,
      };
      localStorage.setItem("dadosCadastro", JSON.stringify(dadosCadastro));
      formularioCadastro.reset();
  })

  formularioLogin.addEventListener("submit", function(event){
    event.preventDefault();
    //verifica se preencheu email & login
    if(!emailInputLogin.value){
      emailErrorLogin.style.display = "block"
    } else{
      emailErrorLogin.style.display = "none"
    }
     if(!senhaInputLogin.value){
      senhaErrorLogin.style.display = "block"
    } else{
      senhaErrorLogin.style.display = "none"
    }

    const dadosSalvos = localStorage.getItem("dadosCadastro")
    const usuario = JSON.parse(dadosSalvos)

     if (emailInputLogin.value === usuario.email && senhaInputLogin.value === usuario.senha){
        loginMessage.style.display = "block"
    } else {
       loginMessage.style.display = "none"
    }
    formularioLogin.reset();
  })
})