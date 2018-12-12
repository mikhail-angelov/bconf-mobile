package com.mobiledemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.RNFetchBlob.RNFetchBlobPackage;  

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
  }
  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new ReactNativeConfigPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFetchBlobPackage(),
            new PickerPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}