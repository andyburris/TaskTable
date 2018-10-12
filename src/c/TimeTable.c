#include <pebble.h>
#include <stdint.h>
#include "TaskTable.h"
#include "TimeTable.h"
#include "AddTask.h"
#include "AppMessages.h"

//int table_size = 8;



Row menuRows[table_size];

void setMenuRows(char *str, int i){
  //for(int i = 0; i<= table_size; i++){
    /*menuRows[i].name = malloc(sizeof(char) * (1+1));
    //menuRows[i].name = i;
    dec_to_str(menuRows[i].name, i, 1);*/

  //}
  menuRows[i].name = malloc(sizeof(char) * (strlen(str)+1));
  strcpy(menuRows[i].name, str);

}

void setMenuCount(int count, int i){

  menuRows[i].tasks = count;

}


void dec_to_str (char* str, uint32_t val, size_t digits)
{
  size_t i=1u;

  for(; i<=digits; i++)
  {
    str[digits-i] = (char)((val % 10u) + '0');
    val/=10u;
  }

  str[i-1u] = '\0'; // assuming you want null terminated strings?
}
