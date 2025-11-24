package io.onuxt.capacitor;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import android.view.Window;
import android.view.View;
import android.view.WindowManager;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        // Set transparent status bar
        window.setStatusBarColor(android.graphics.Color.TRANSPARENT);

        // Set transparent navigation bar
        window.setNavigationBarColor(android.graphics.Color.TRANSPARENT);

        // Extend content to both ends (status bar + bottom navigation bar)
        window.getDecorView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
          View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
          View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        );
    }
}