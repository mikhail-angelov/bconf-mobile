package com.mobiledemo;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;

public class MainActivity extends NavigationActivity {
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
