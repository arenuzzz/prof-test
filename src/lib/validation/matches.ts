export const hasEightCharactersRegex = /.{8,}/;
export const hasLowercaseRegex = /[a-z]/;
export const hasUppercaseRegex = /[A-Z]/;
export const hasNumberRegex = /\d/;

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex = /^[+]+[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{10,15}$/gm;
export const instagramValidationRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
export const instagramReplacerRegex = /[^a-zA-Z_.0-9]/gm;
export const telegramReplacerRegex = /[^a-zA-Z0-9_.@]/gm;
