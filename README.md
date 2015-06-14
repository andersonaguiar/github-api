# Github API

## Rodando a aplicação

npm install
gulp build
gulp server

## Escolha das tecnologias

### Backbone

O Backbone entra para assumir a responsabilidade de abstração da camada 
REST consumindo a API, além de oferecer uma clareza na organização e no modo de escrita  
do código, além de possuir um excelente sistema de eventos.

### RequireJS

Oferecer JS sob demanda deve ser um item obrigatório quando se trata de 
desenvolvimento web, esse foi o motivo da escolha. Centralizar 
o registro dos modules tornando assim o código manutenível, também é 
um dos pontos favoráveis além de suportar CommonJS e AMD.

### ReactJS

Quando falamos de view em JS devemos logo nos remeter a DOM. A modificação 
costante da DOM torna o processo custoso, isso é uma das muitas coisas que devemos 
colocar na balança quando se deve optar por alguma tecnologia. No contexto do 
teste, os principais fatores foram: Componentização, virtual DOM e o ciclo de 
vida dos componentes. Esses são alguns dos pontos que fazem do React uma ótima 
opção para view.
