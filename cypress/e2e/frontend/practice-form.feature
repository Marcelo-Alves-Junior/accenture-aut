# Resumo:

# Acessar o site https://demoqa.com/
# Escolher a opção Forms na página inicial
# Clicar no submenu Practice Form
# Preencher todo o formulário com valores aleatórios
# O Arquivo utilizado para upload, precisa ser um .txt qualquer, e precisa estar na devida pasta do github ao ser publicado o projeto
# Submter o formulário
# Garantir que um popup foi aberto após o submit
# Fechar o popup

# language: pt

Funcionalidade: Preenchimento do formulário Practice Form

  Cenário: Preencher e enviar o formulário com sucesso
    Dado que acesso a página DemoQA
    Quando seleciono a opção Forms
    E acesso o submenu Practice Form
    E preencho todo o formulário com dados válidos
    Então o popup de confirmação deve ser exibido
    Quando fecho o popup de confirmação
    Então o popup de confirmação não deve mais estar visível