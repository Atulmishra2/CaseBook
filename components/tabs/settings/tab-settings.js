window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["settings"] = /* HTML */ `<div class="w-full max-w-2xl mx-auto space-y-6 py-6">

    <!-- ================= CARD 1: SUPABASE ================= -->
    <div class="w-full max-w-2xl bg-[#111827] rounded-2xl border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
        
        <!-- Header: Horizontal row, Title on Left, Badge & Chevron on Right -->
        <button type="button" onclick="toggleCollapse('supabaseContent', 'supabaseChevron')" class="w-full text-left p-6 bg-[#111827] border-0 flex flex-row items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors focus:outline-none group cursor-pointer">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg class="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.97 2.25c-2.187 0-4.279.588-6.11 1.686A8.026 8.026 0 001.2 7.87a8.044 8.044 0 00-.842 3.17 8.026 8.026 0 001.684 6.1 8.027 8.027 0 003.935 3.05c2.091.58 4.334.503 6.393-.224a8.04 8.04 0 004.877-4.41 8.026 8.026 0 00.647-6.32 8.044 8.044 0 00-3.935-4.05c-1.83-1.098-3.923-1.686-6.11-1.686zM9.31 15.9a1.35 1.35 0 01-1.91-1.91l6.53-6.53a1.35 1.35 0 011.91 1.91L9.31 15.9zm1.38-5.4a1.35 1.35 0 01-1.91 1.91L5.85 9.48a1.35 1.35 0 011.91-1.91l2.93 2.93zm6.78 6.78a1.35 1.35 0 01-1.91 1.91l-2.93-2.93a1.35 1.35 0 011.91-1.91l2.93 2.93z"/>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-white tracking-tight">Supabase Cloud Database</h2>
                </div>
            </div>
            
            <div class="flex items-center gap-3 flex-shrink-0">
                <div id="supabaseConnBadge" class="flex items-center gap-2 bg-slate-900 border border-slate-700/50 px-3 py-1.5 rounded-full transition-colors duration-300">
                    <span id="statusDot" class="w-2 h-2 rounded-full bg-rose-500 animate-pulse transition-colors duration-300"></span>
                    <span id="statusText" class="text-xs font-semibold text-slate-300">Not Configured</span>
                </div>
                <div class="text-slate-500 group-hover:text-slate-300">
                    <svg id="supabaseChevron" class="w-5 h-5 chevron-icon open" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </button>

        <!-- Body -->
        <div id="supabaseContent" class="collapse-content open">
            <div class="collapse-inner">
                <div class="p-6 border-t border-slate-800/60 space-y-6 bg-slate-900/30">
                    <form id="supabaseConfigForm" action="javascript:void(0);" onsubmit="return handleSaveSupabaseConfig(event);" class="space-y-6">
                        <div>
                            <label for="supabaseProjectUrlInput" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project URL</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                </div>
                                <input type="url" id="supabaseProjectUrlInput" placeholder="https://your-project.supabase.co" class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all placeholder:text-slate-600" autocomplete="off">
                            </div>
                        </div>

                        <div>
                            <label for="supabaseAnonKeyInput" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Anon / Public API Key</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                                </div>
                                <input type="password" id="supabaseAnonKeyInput" placeholder="eyJhbGciOi... or sb_publishable_..." class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-12 py-3 outline-none transition-all placeholder:text-slate-600" autocomplete="off">
                                <button type="button" class="pwd-toggle-btn absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" onclick="togglePasswordVisibility('supabaseAnonKeyInput', this)" title="Show/Hide Key">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Action Area -->
                        <div class="pt-2 space-y-4">
                            <!-- Primary Button -->
                            <button type="submit" id="connectBtn" class="btn-gradient w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3.5 rounded-xl cursor-pointer">
                                <svg id="connectIcon" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                <span id="connectBtnText">Save & Connect</span>
                                <svg id="loadingSpinner" class="hidden animate-spin w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            </button>

                            <!-- Inline Secondary Buttons -->
                            <div class="flex items-center gap-3 w-full">
                                <!-- Disconnect Button -->
                                <button type="button" id="disconnectBtn" onclick="handleClearSupabaseConfig()" class="hidden flex-1 items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 font-medium text-sm py-3 rounded-xl transition-all animate-slide-in cursor-pointer">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                    <span class="truncate">Disconnect</span>
                                </button>

                                <!-- Test Connection Button -->
                                <button type="button" id="testBtn" onclick="handleTestSupabaseConfig()" class="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-medium text-sm py-3 rounded-xl transition-all cursor-pointer">
                                    <svg id="testIcon" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    <span id="testBtnText" class="truncate">Test Connection</span>
                                    <svg id="testSpinner" class="hidden animate-spin w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                </button>
                            </div>

                            <p id="supabaseConfigStatus" class="update-status-msg text-xs mt-2"></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= CARD 2: CREDENTIALS ================= -->
    <div class="w-full max-w-2xl bg-[#111827] rounded-2xl border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
        
        <!-- Header -->
        <button type="button" onclick="toggleCollapse('credsContent', 'credsChevron')" class="w-full text-left p-6 bg-[#111827] border-0 flex flex-row items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors focus:outline-none group cursor-pointer">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.1)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-white tracking-tight flex items-center gap-2">Update Credentials</h2>
                    <p class="text-sm text-slate-400 mt-0.5">Manage your active username and security password.</p>
                </div>
            </div>
            
            <div class="flex items-center gap-3 flex-shrink-0">
                <div class="text-slate-500 group-hover:text-slate-300">
                    <svg id="credsChevron" class="w-5 h-5 chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </button>

        <!-- Body -->
        <div id="credsContent" class="collapse-content">
            <div class="collapse-inner">
                <div class="p-6 border-t border-slate-800/60 space-y-6 bg-slate-900/30">
                    <form id="changePasswordForm" class="space-y-6" action="javascript:void(0);" onsubmit="return handleChangeCredentials(event);">
                        <div>
                            <label for="currentAdminUsername" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Username</label>
                            <input type="text" id="currentAdminUsername" value="AtulMishra" readonly class="w-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm rounded-xl px-4 py-3 outline-none cursor-not-allowed">
                        </div>

                        <div>
                            <label for="currentPassword" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
                            <div class="relative">
                                <input type="password" id="currentPassword" placeholder="Enter current password" required class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl pl-4 pr-12 py-3 outline-none transition-all placeholder:text-slate-600">
                                <button type="button" class="pwd-toggle-btn absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" onclick="togglePasswordVisibility('currentPassword', this)" title="Show/Hide Password">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label for="newUsername" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Username</label>
                            <input type="text" id="newUsername" value="AtulMishra" required class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl px-4 py-3 outline-none transition-all">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="newPassword" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                                <div class="relative">
                                    <input type="password" id="newPassword" placeholder="Enter new password" required minlength="4" class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl pl-4 pr-12 py-3 outline-none transition-all placeholder:text-slate-600">
                                    <button type="button" class="pwd-toggle-btn absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" onclick="togglePasswordVisibility('newPassword', this)" title="Show/Hide Password">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label for="confirmNewPassword" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                                <div class="relative">
                                    <input type="password" id="confirmNewPassword" placeholder="Re-enter new password" required minlength="4" class="custom-input w-full bg-[#0B1120] border border-slate-700 text-white text-sm rounded-xl pl-4 pr-12 py-3 outline-none transition-all placeholder:text-slate-600">
                                    <button type="button" class="pwd-toggle-btn absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" onclick="togglePasswordVisibility('confirmNewPassword', this)" title="Show/Hide Password">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-teal-500/20 cursor-pointer">
                                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                Submit Password Update
                            </button>
                        </div>
                        <p id="settingsStatus" class="update-status-msg text-xs mt-2"></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
`;
