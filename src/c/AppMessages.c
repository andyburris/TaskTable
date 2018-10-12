#include <pebble.h>
#include "AddTask.h"
#include "TaskTable.h"
#include "AppMessages.h"
#include "LoadingWindow.h"
#include "TimeTable.h"



static int string_index;
static int int_index;
char *table_data;
int table_tasks;
static bool table_loaded = false;

static bool s_js_ready;


static void in_received_handler(DictionaryIterator *iter, void *context);
static void in_dropped_handler(AppMessageResult reason, void *context);
static void out_failed_handler(DictionaryIterator *failed, AppMessageResult reason, void *context);
//static void outbox_sent_handler(DictionaryIterator *iter, void *context);


static void in_received_handler(DictionaryIterator *iter, void *context){
	DEBUG_MSG("Recieved Message");
	Tuple *ready_tuple = dict_find(iter, MESSAGE_KEY_JSReady);
	if(ready_tuple) {
		DEBUG_MSG("JS Ready");
		// PebbleKit JS is ready! Safe to send messages
		s_js_ready = true;
	}

	Tuple *table_data_tuple = dict_find(iter, MESSAGE_KEY_TableUpdateString + string_index);
	Tuple *table_int_tuple = dict_find(iter, MESSAGE_KEY_TableInt + int_index);
	DEBUG_MSG("match key: %d",	(int)MESSAGE_KEY_TableInt + int_index);


  if(table_data_tuple) {

		DEBUG_MSG("Table String");


    // Store this item

    //table_data = table_data_tuple->value->cstring;

		setMenuRows(table_data_tuple->value->cstring, string_index);

    // Increment index for next item
    string_index++;
		DEBUG_MSG("String index: %d", string_index);


  }else if(table_int_tuple) {

		DEBUG_MSG("Table Count");

		// Store this item

		//table_data = table_data_tuple->value->cstring;

		setMenuCount(table_int_tuple->value->int32, int_index);

		// Increment index for next item
		int_index++;

		DEBUG_MSG("Int index: %d", int_index);

	}else{

	}

  if(string_index == NUM_ITEMS && int_index == NUM_ITEMS) {
    // We have reached the end of the sequence
    APP_LOG(APP_LOG_LEVEL_INFO, "All transmission complete!");
		load_table();
  }

}

static void in_dropped_handler(AppMessageResult reason, void *context){

}

static void out_failed_handler(DictionaryIterator *failed, AppMessageResult reason, void *context){

}

/*static void outbox_sent_handler(DictionaryIterator *iter, void *context) {

}*/

void app_message_init()
{
	app_message_register_inbox_received(in_received_handler);
	app_message_register_inbox_dropped(in_dropped_handler);
	app_message_register_outbox_failed(out_failed_handler);

	int max = app_message_inbox_size_maximum();

	int inboxSize = max > 1024 ? 1024 : max;

	app_message_open(inboxSize, 256);
}

bool comm_is_js_ready() {
  return s_js_ready;
}
