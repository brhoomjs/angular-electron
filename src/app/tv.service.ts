import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ElectronService } from "./core/services";

@Injectable({
  providedIn: "any",
})
export class TvService {
  lanuched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tvWindow: Electron.BrowserWindow;
  primaryWindowId: number;
  channel: BroadcastChannel;
  constructor(private electronService: ElectronService) {
    this.channel = new BroadcastChannel("tv-service");
    const windows = electronService.remote.BrowserWindow.getAllWindows();
    this.primaryWindowId = electronService.remote.getCurrentWindow().id;
    windows.forEach((window) => {
      if (window.id !== this.primaryWindowId) {
        this.lanuched.next(true);
      }
    });
  }

  startDraw(n: number, p: number) {
    const winners = Array.from({ length: p }, (_, k) => k + 1)
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, n);
    this.channel.postMessage({ type: 2, payloads: { winners } });
  }

  setTimer(time: number): void {
    this.channel.postMessage({ type: 0, payloads: { time } });
  }
  async changeLaunched(): Promise<void> {
    if (!this.lanuched.value) {
      const canOpen = await this.OpenTV();
      if (canOpen) this.lanuched.next(true);
    } else {
      this.CloseTV();
    }
  }

  private async OpenTV(): Promise<boolean> {
    const displays = this.electronService.remote.screen.getAllDisplays();
    const externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0;
    });
    if (externalDisplay) {
      const { x, y, width, height } = externalDisplay.bounds;
      this.tvWindow = new this.electronService.remote.BrowserWindow({
        fullscreen: true,
        fullscreenable: true,
        fullscreenWindowTitle: false,
        frame: false,
        maximizable: false,
        minimizable: false,
        movable: false,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        // focusable: false,
        webPreferences: {
          nodeIntegration: true,
          allowRunningInsecureContent: true,
          contextIsolation: false, // false if you want to run 2e2 test with Spectron
          enableRemoteModule: true, // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
        x,
        y,
        width,
        height,
      });
      // this.tvWindow.loadURL('http://localhost:4200/#/tv');
      this.tvWindow.loadURL(
        this.electronService.url.format({
          pathname: this.electronService.path.join(__dirname, "/index.html"),
          protocol: "file:",
          slashes: true,
          hash: "/tv",
        })
      );
      this.tvWindow.on("closed", () => {
        this.lanuched.next(false);
      });
      return true;
    } else {
      window.alert("No TV Screen Attached to The Computer!");
      return false;
    }
  }
  private CloseTV(): void {
    const windows = this.electronService.remote.BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      if (window.id !== this.primaryWindowId) {
        window.close();
      }
    });
    this.lanuched.next(false);
  }
}
export enum TvStatus {
  empty = 3,
  clock = 5,
  draw = 6,
}
