export type UserProps = {
	data: {
		subscriptions: {
			plan: "FREE" | "PRO";
		} | null;
		workspace: {
			id: string;
			name: string;
			type: "PUBLIC" | "PERSONAL";
		}[];
		members: {
			workspace: {
				id: string;
				name: string;
				type: "PUBLIC" | "PERSONAL";
			};
		}[];
	};
};

export type NotificationsProps = {
	status: number;
	data: {
		_count: {
			notifications: number;
		};
	};
};

export type UserWorkspaceResponse =
	| {
			status: 200;
			data: {
				subscriptions: {
					plan: "PRO" | "FREE";
				};
				workspace: {
					id: string;
					name: string;
					type: string;
				} | null;
				members: {
					Workspace: {
						id: string;
						name: string;
						type: string;
					};
				}[];
			};
	  }
	| {
			status: 403;
			data?: [];
	  };
