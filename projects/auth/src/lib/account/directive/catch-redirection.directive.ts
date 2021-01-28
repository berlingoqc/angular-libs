import { Directive } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions } from "../model/redirect-action.config";

@Directive({
  selector: "[albCatchRedirection]",
})
export class CatchRedirectionDirective {
  static QUERY_NAME_ACTION = "action";

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const action = this.activatedRoute.snapshot.queryParams[
      CatchRedirectionDirective.QUERY_NAME_ACTION
    ];
    if (action) {
      const path = this.actions[action];
      if (path) {
        this.router.navigate([path], { queryParamsHandling: 'preserve' });
      } else {
        console.log("ACTION OR PATH NOT FOUND");
      }
    }
  }
}
