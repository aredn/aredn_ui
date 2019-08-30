import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AudioContext } from 'angular-audio-context';

@Component({
  selector: 'aredn-tone',
  templateUrl: './tone.component.html',
  styleUrls: ['./tone.component.scss']
})
export class ToneComponent implements OnInit, OnChanges {

  @Input() snr: number;
  @Input() feedActive: boolean;

  oscillator: any;
  gainNode: any;
  toneActive: boolean = false;
  pitch: number = 50;
  volume: number = 5;

  constructor(private audioContext: AudioContext) { }

  ngOnChanges(changes: SimpleChanges): void {
    //turn the tone off automatically if the feed stops
    if (typeof this.feedActive !== 'undefined') {
      if (this.toneActive && !this.feedActive) {
        this.toneOff();
      }
    }
    this.updateToneAndFrequency();
  }

  ngOnInit() {
    this.setupOscillator();
  }

  onSettingsChanged() {
    this.updateToneAndFrequency();
  }

  private setupOscillator() {
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.oscillator.type = 'sine';
    this.gainNode.connect(this.audioContext.destination);
  }

  private updateToneAndFrequency() {
    if (this.oscillator && this.gainNode) {
      this.oscillator.frequency.value = this.snr * this.pitch;
      this.gainNode.gain.value = this.volume / 10;
    }
  }

  toneOn() {
    this.setupOscillator();
    this.updateToneAndFrequency();
    this.oscillator.start();
    this.toneActive = true;
  }

  toneOff() {
    this.oscillator.stop();
    this.toneActive = false;
  }
}
