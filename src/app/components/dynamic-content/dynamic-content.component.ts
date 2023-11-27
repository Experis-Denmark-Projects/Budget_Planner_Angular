import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.css']
})
export class DynamicContentComponent{
  @ViewChild('dynamicContentContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  componentRef: ComponentRef<any> | null = null

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(component: any) {
    this.clearComponent(); // Clear existing component if any
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(componentFactory);
  }

  clearComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  ngOnDestroy() {
    this.clearComponent();
  }
}