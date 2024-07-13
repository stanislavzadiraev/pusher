# pusher

Утилита для создания и/или удаления окружения для запуска функций из скрипта `main` из файла `package.jsom` из пакета `PACKAGE` посредством командной строки, глобально установленного пакета `PACKAGE` командой `PACKAGE`, локально установленного пакета `PACKAGE` командой `npm run PACKAGE`.

## Подготовка проекта

`package.json`:
 ```js
 /// Установка
  "devDependencies": {
    ///...
    "pusher": "github:stanislavzadiraev/pusher",
    ///...
  },
///...

/// Подключение
  "scripts": {
    ///...
    "pusher": "pusher",
    ///...
  },
///...
```
## Работа пакета
### Выполнение
```sh
#создание окружения
npm run pusher build

#удаление окружения
npm run pusher prune
```
### Окружение
  - файловая подсистема `bin`