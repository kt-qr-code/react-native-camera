package org.reactnative.camera.tasks;

import com.dynamsoft.barcode.TextResult;

public interface DynamsoftBarcodeDetectorAsyncTaskDelegate {
    void onDynamsoftBarCodeDetected(TextResult[] barcodes, int width, int height);
    void onDynamsoftBarCodeDetectingTaskCompleted();
}
