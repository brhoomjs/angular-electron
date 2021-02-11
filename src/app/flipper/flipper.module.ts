import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlipperComponent } from "./flipper.component";

@NgModule({
  declarations: [FlipperComponent],
  imports: [CommonModule],
  exports: [FlipperComponent],
})
export class FlipperModule {}
