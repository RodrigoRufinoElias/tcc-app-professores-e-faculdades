# Este projeto utiliza a versão 14.19.0 do Node.JS
# Recomendo a utilização do NVM para gerenciar o Node.JS

# Se não tiver o Ionic CLI instalado
npm install -g @ionic/cli

# Instalar dependências
$ npm install

# serve with hot reload at localhost:8100
$ ionic serve

# ==== Rodar app no emulador do Android Studio ====
# Gerar versão para prod
ionic build
# Add plataforma Android ao projeto
ionic cap add android (Se já foi gerado, usar "ionic cap sync")
# Abrir projeto no Android Studio
npx cap open android

# ==== Gerar Icones e Splashes para o android ====
# Instalar Cordova (se já não estiver instalado)
npm install -g cordova-res
# Gerar Icones e Splashes
cordova-res android --skip-config --copy
