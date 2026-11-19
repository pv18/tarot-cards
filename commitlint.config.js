export default {
  extends: ['@commitlint/config-conventional'],
  // русские описания могут начинаться с заглавной буквы (названия, аббревиатуры),
  // поэтому правило регистра subject отключаем
  rules: {
    'subject-case': [0],
  },
};
