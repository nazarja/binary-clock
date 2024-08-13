# Binary Clock

A simple binary clock written in TypeScript and SCSS.

## How to read a binary clock

The clock is divided into 3 sections, hours, minutes and seconds

```
   *        *         *      ->  8
   *      * *       * *      ->  4
 * *      * *       * *      ->  2
 * *      * *       * *      ->  1
hours   minutes   seconds
```

Each section consists of 2 columns, which each represent a 2 digit number, for example, 03, 15 etc..

The numbers you see on the right hand side of the snippet above represent the value of a cell at that level.

So, to get a number 1, you would see:

```
-  -> 8
-  -> 4
-  -> 2
*  -> 1
1
```

To get a number 5 we would add 1 + 4, in that case you would see:
```
-  -> 8
*  -> 4
-  -> 2
*  -> 1
5
```

To represent a two digit number, we have two columns, so the number 36 could be seen as:

```
- -  -> 8
- *  -> 4
* *  -> 2
* -  -> 1

3 6
```

All together a time of 19:34:58 (7:34:58pm), you would see:
```
  *    -    *  -> 8
  -  - *  * -  -> 4
- -  * -  - -  -> 2
* *  * *  * -  -> 1
1 9  3 4  5 8
```