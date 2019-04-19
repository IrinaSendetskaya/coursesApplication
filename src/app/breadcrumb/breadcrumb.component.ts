import { Component, OnInit } from "@angular/core";
import { filter, distinctUntilChanged } from "rxjs/operators";
import { Router, NavigationEnd, ActivatedRoute, Event, Params } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent implements OnInit {
  constructor(private _router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  breadcrumbs: IBreadCrumb[];

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    let labelNew =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : "";
    let pathNew =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";

    let params = route.snapshot.root.params;
    const lastRouterPart = pathNew.split("/").pop();
    const isDynamicRoute = lastRouterPart.startsWith(":");

    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRouterPart.split(":")[1];
      pathNew = pathNew.replace(
        lastRouterPart,
        route.snapshot.params[paramName]
      );
      labelNew = route.snapshot.params[paramName];
    }

    const nextUrl = pathNew ? "${url}/${pathNew}/" : url;
    const breadcrumb: IBreadCrumb = {
      label: labelNew,
      url: nextUrl,
      params:params
    };

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
export interface IBreadCrumb {
  label: string;
  url: string;
  params:Params;
}
